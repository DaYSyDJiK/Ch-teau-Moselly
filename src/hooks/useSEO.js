import { useEffect } from "react";

export default function useSEO({ title, description, robots }) {
  useEffect(() => {
    // Title
    if (title) {
      document.title = title;
    }

    // Description
    if (description) {
      let metaDesc = document.querySelector("meta[name='description']");

      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }

      metaDesc.setAttribute("content", description);
    }

    // Robots
    if (robots) {
      let metaRobots = document.querySelector("meta[name='robots']");

      if (!metaRobots) {
        metaRobots = document.createElement("meta");
        metaRobots.setAttribute("name", "robots");
        document.head.appendChild(metaRobots);
      }

      metaRobots.setAttribute("content", robots);
    }

    // Cleanup (important pour SPA)
    return () => {
      if (robots) {
        const metaRobots = document.querySelector("meta[name='robots']");
        if (metaRobots) metaRobots.remove();
      }
    };
  }, [title, description, robots]);
}