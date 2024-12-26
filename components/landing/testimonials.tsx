export function Testimonials() {
  const testimonials = [
    {
      content:
        "IntelliDo has completely transformed how our team manages projects. It's intuitive and powerful.",
      author: "Sarah Johnson",
      role: "Product Manager",
    },
    {
      content:
        "The best task management tool I've ever used. The sharing feature is a game-changer.",
      author: "Michael Chen",
      role: "Team Lead",
    },
    {
      content:
        "Simple yet powerful. Exactly what we needed for our daily task management.",
      author: "Emily Rodriguez",
      role: "Designer",
    },
  ];

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Loved by teams worldwide
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-8"
              >
                <blockquote className="text-gray-900 dark:text-white">
                  <p>{testimonial.content}</p>
                </blockquote>
                <div className="mt-6">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
