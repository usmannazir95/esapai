import dynamic from "next/dynamic";

const ProductHaloFlowDemoSection = dynamic(
  () =>
    import("@/components/sections/demo/product-halo-flow-demo").then((mod) => ({
      default: mod.ProductHaloFlowDemo,
    })),
);

export default function DemoPage() {
  return (
    <main className="relative">
      <ProductHaloFlowDemoSection />
    </main>
  );
}

