const options = {
  fpsLimit:20,
  fullScreen: { enable: true },
  particles: {
    number: {
      value: 7,
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.3,
    },
    size: {
      value: 220,
    },
    move: {
      enable: true,
      speed: 1,
      random: true,
    },
  },

  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 250,
        duration: 2,
      },
    },
  },
  style: {
    filter: "blur(50px)",
  },
  detectRetina: true,
  themes: [
    {
      name: "light",
      default: {
        value: true,
      },
      options: {
        background: {
          // color: "#fcf8f2",
        },
        particles: {
          color: {
            value: ["#5bc0eb", "#9bc53d", "#e55934","#fde74c"],
          },
        },
      },
    },
  ],
};

export default options;
