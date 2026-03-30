import { useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import { resolveSeo } from "@/lib/seo";
import { applyDocumentSeo } from "@/lib/seoDom";

const SeoManager = () => {
  const location = useLocation();
  const seo = useMemo(() => resolveSeo(location.pathname), [location.pathname]);

  useEffect(() => {
    applyDocumentSeo({
      title: seo.title,
      description: seo.description,
      canonicalPath: seo.canonicalPath,
      noindex: seo.noindex,
    });
  }, [seo]);

  return null;
};

export default SeoManager;
