import { StructuredData } from "@/lib/seo/structured-data";

interface StructuredDataProps {
  data: StructuredData | StructuredData[];
}

/**
 * Component to inject JSON-LD structured data into the page
 * Supports single schema or array of schemas
 */
export function StructuredDataComponent({ data }: StructuredDataProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
