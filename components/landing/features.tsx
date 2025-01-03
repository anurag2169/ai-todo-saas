export function Features() {
  const features = [
    {
      title: "Task Organization",
      description:
        "Create, edit, and organize your tasks with a beautiful interface",
      icon: "📝",
    },
    {
      title: "Collaboration",
      description: "Share tasks with team members and track progress together",
      icon: "👥",
    },
    {
      title: "Real-time Updates",
      description: "Stay in sync with instant updates when tasks are modified",
      icon: "⚡",
    },
    {
      title: "Smart Notifications",
      description: "Get notified about task updates and upcoming deadlines",
      icon: "🔔",
    },
  ];

  return (
    <div id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Powerful Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to manage tasks
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            IntelliDo comes with all the features you need to stay organized and
            productive
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.title} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  {feature.title}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
