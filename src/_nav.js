/* export default {
  items: [
    {
      title: true,
      name: "Inicio",
      class: "text-center"
    },
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-home",
      children: [
        {
          name: "Vacio",
          url: "/Dashboard",
          icon: "icon-puzzle"
        }
      ]
    }
  ]
}; */
var menu = {};

// eslint-disable-next-line no-self-compare
if (2 == 1) {
  menu = {
    items: [
      {
        title: true,
        name: "Inicio",
        class: "text-center"
      },
      {
        name: "Dashboard",
        url: "/dashboard",
        icon: "icon-home",
        children: [
          {
            name: "Vacio",
            url: "/Dashboard",
            icon: "icon-puzzle"
          }
        ]
      }
    ]
  };
} else {
  menu = {
    items: [
      {
        title: true,
        name: "Inicio",
        class: "text-center"
      },
      {
        name: "Dashboard",
        url: "/dashboard",
        icon: "icon-home"
      }
    ]
  };
}

export default menu;
