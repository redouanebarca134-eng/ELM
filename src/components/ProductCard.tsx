import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import Stars from "./Stars";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-shadow hover:shadow-lg">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-sand/40"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.oldPrice && (
          <span className="absolute top-3 end-3 rounded-full bg-gold px-3 py-1 font-heading text-xs font-bold text-forest">
            تخفيض
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Stars rating={product.rating} size={14} />
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-2 font-heading text-lg font-bold text-forest transition-colors group-hover:text-gold">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-ink/60">
          {product.tagline}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="font-heading text-xl font-extrabold text-gold-dark">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-ink/40 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="btn-forest mt-4 w-full !min-h-[44px] !py-2 text-sm"
        >
          عرض المنتج
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
