export const cardStyles = {
  base: "bg-white/10 backdrop-blur-lg rounded-xl border border-white/10 shadow-xl dark:bg-gray-800/10 dark:border-gray-700/10",
  hover: "hover:card-hover hover:neon-border transition-all duration-300",
  gradient:
    "bg-gradient-to-br from-white/5 to-white/10 dark:from-gray-800/5 dark:to-gray-800/10",
};

export const buttonStyles = {
  primary:
    "px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-full font-medium shadow-lg hover:shadow-primary/50 transform hover:-translate-y-0.5 transition-all duration-200",
  secondary:
    "px-4 py-2 bg-white/20 backdrop-blur text-primary rounded-full hover:bg-white/30 transition-all duration-200",
};

export const textStyles = {
  gradient:
    "bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-primary animate-gradient",
  heading: "text-2xl font-bold text-light-text dark:text-white",
  subheading: "text-light-secondary dark:text-dark-secondary",
};
