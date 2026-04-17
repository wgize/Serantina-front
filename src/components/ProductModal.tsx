import React, { useState } from "react";
import { X, Plus, Minus, Check } from "lucide-react";
import type { MenuItem, SizeOption } from "@/types/cart";
import { useCart } from "@/hooks/useCart";

interface ProductModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  /** Si se provee, el modal opera en modo edición y usa UPDATE_ITEM al confirmar */
  cartItemId?: string;
  initialQuantity?: number;
  initialSize?: string;
  initialCustomizations?: string[];
}

export const ProductModal: React.FC<ProductModalProps> = ({
  item,
  isOpen,
  onClose,
  cartItemId,
  initialQuantity,
  initialSize,
  initialCustomizations,
}) => {
  const { dispatch } = useCart();
  const isEditMode = Boolean(cartItemId);

  const hasSizes = Boolean(item.sizes && item.sizes.length > 0);
  const hasCustomizations = Boolean(
    item.customizationOptions && item.customizationOptions.length > 0,
  );

  // Tamaño seleccionado — solo si el producto tiene variantes
  const defaultSize: SizeOption | undefined = hasSizes
    ? item.sizes!.find((s) => s.label === initialSize) ?? item.sizes![0]
    : undefined;

  const [quantity, setQuantity] = useState(initialQuantity ?? 1);
  const [selectedSize, setSelectedSize] = useState<SizeOption | undefined>(defaultSize);
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>(
    initialCustomizations ?? [],
  );
  const [added, setAdded] = useState(false);

  // Precio activo: el del tamaño elegido o el precio base del producto
  const activePrice = selectedSize?.price ?? item.price;

  const handleAddToCart = () => {
    if (isEditMode && cartItemId) {
      dispatch({
        type: "UPDATE_ITEM",
        payload: {
          id: cartItemId,
          updates: {
            price: activePrice,
            quantity,
            size: selectedSize?.label,
            customizations: selectedCustomizations,
          },
        },
      });
    } else {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          ...item,
          price: activePrice,
          quantity,
          size: selectedSize?.label,
          customizations: selectedCustomizations,
        },
      });
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      setQuantity(1);
      setSelectedSize(hasSizes ? item.sizes![0] : undefined);
      setSelectedCustomizations([]);
    }, 900);
  };

  const toggleCustomization = (opt: string) => {
    setSelectedCustomizations((prev) =>
      prev.includes(opt) ? prev.filter((c) => c !== opt) : [...prev, opt],
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 gap-3">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#1C1008] leading-tight">
                {item.name}
              </h3>
              {item.tag && (
                <span className="inline-block mt-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#C8A96E]/20 text-[#8B6914]">
                  {item.tag}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image */}
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />

          {/* Description */}
          <p className="text-[#6B3A2A]/70 text-sm mb-5">{item.desc}</p>

          {/* Precio dinámico */}
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-2xl font-bold text-[#C8A96E]">{activePrice}</span>
            {hasSizes && selectedSize && selectedSize.price !== item.price && (
              <span className="text-sm text-[#6B3A2A]/40 line-through">{item.price}</span>
            )}
          </div>

          {/* Selector de tamaño — solo si el producto lo tiene */}
          {hasSizes && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#1C1008] mb-3">
                Tamaño
              </label>
              <div className="space-y-2">
                {item.sizes!.map((size) => {
                  const isSelected = selectedSize?.label === size.label;
                  return (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(size)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all duration-150 ${
                        isSelected
                          ? "border-[#C8A96E] bg-[#C8A96E]/8 text-[#1C1008]"
                          : "border-[#C8A96E]/15 bg-[#FBF8F3] text-[#6B3A2A] hover:border-[#C8A96E]/40"
                      }`}
                    >
                      <span className={isSelected ? "font-medium" : ""}>{size.label}</span>
                      <span
                        className={`font-bold ${isSelected ? "text-[#C8A96E]" : "text-[#6B3A2A]/60"}`}
                      >
                        {size.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cantidad */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#1C1008] mb-3">
              Cantidad
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-[#C8A96E]/20 rounded-full hover:bg-[#C8A96E]/8 transition-colors"
              >
                <Minus className="w-4 h-4 text-[#6B3A2A]" />
              </button>
              <span className="text-lg font-semibold text-[#1C1008] w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-[#C8A96E]/20 rounded-full hover:bg-[#C8A96E]/8 transition-colors"
              >
                <Plus className="w-4 h-4 text-[#6B3A2A]" />
              </button>
              {quantity > 1 && (
                <span className="text-sm text-[#6B3A2A]/50 ml-1">
                  = {/* subtotal visual */}
                  <span className="font-medium text-[#C8A96E]">
                    S/{" "}
                    {(
                      parseFloat(activePrice.replace("S/ ", "")) * quantity
                    ).toFixed(2)}
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Personalizaciones — solo si el producto las tiene */}
          {hasCustomizations && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#1C1008] mb-3">
                Personalizaciones
                <span className="text-xs font-normal text-[#6B3A2A]/40 ml-2">
                  (opcional)
                </span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.customizationOptions!.map((opt) => {
                  const checked = selectedCustomizations.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => toggleCustomization(opt)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-150 text-left ${
                        checked
                          ? "border-[#C8A96E] bg-[#C8A96E]/10 text-[#8B6914]"
                          : "border-[#C8A96E]/15 bg-[#FBF8F3] text-[#6B3A2A]/70 hover:border-[#C8A96E]/35"
                      }`}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded border flex-shrink-0 flex items-center justify-center ${
                          checked ? "bg-[#C8A96E] border-[#C8A96E]" : "border-[#C8A96E]/30"
                        }`}
                      >
                        {checked && <Check className="w-2.5 h-2.5 text-white" />}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Botón agregar */}
          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              added
                ? "bg-[#C8A96E]/15 text-[#C8A96E] border border-[#C8A96E]/40 scale-95 cursor-default"
                : "bg-[#1C1008] text-[#C8A96E] hover:bg-[#2A1810]"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                {isEditMode ? "¡Actualizado!" : "¡Agregado!"}
              </>
            ) : isEditMode ? (
              <>Actualizar pedido</>
            ) : (
              <>
                Agregar al carrito —{" "}
                {quantity > 1
                  ? `S/ ${(parseFloat(activePrice.replace("S/ ", "")) * quantity).toFixed(2)}`
                  : activePrice}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
