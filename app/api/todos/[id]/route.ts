import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { completed, title, description, pinned } = await request.json();
    const todoId = (await params).id;

    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    const updatedData: {
      completed?: boolean;
      pinned?: boolean;
      title?: string;
      description?: string;
      updatedAt?: Date;
    } = {
      updatedAt: new Date(),
    };

    if (completed !== undefined) {
      updatedData.completed = completed;
    }
    if (pinned !== undefined) {
      updatedData.pinned = pinned;
    }

    if (userId === todo.userId) {
      if (title !== undefined && title.trim() !== "") {
        updatedData.title = title;
      }

      if (description !== undefined && description.trim() !== "") {
        updatedData.description = description;
      }
    } else if (title || description) {
      return NextResponse.json(
        { error: "You are not authorized to update title or description" },
        { status: 403 }
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: updatedData,
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const todoId = (await params).id;

    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    if (todo.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.todo.delete({
      where: { id: todoId },
    });

    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
