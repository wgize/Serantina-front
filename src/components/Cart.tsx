import React, { useState } from "react";
import { X, Trash2, Edit, Phone } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { ProductModal } from "@/components/ProductModal";
import type { CartItem } from "@/types/cart";

const parsePrice = (price: string) =>
  parseFloat(price.replace("S/ ", "").replace(",", "."));

export const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);

  const total = state.items.reduce((sum: number, item: CartItem) => {
    return sum + parsePrice(item.price) * item.quantity;
  }, 0);

  const totalItems = state.items.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0,
  );

  const handleReserve = () => {
    const message = generateWhatsAppMessage(state.items, total);
    const phoneNumber = "+51973511402";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    dispatch({ type: "CLEAR_CART" });
    dispatch({ type: "CLOSE_CART" });
  };

  const generateWhatsAppMessage = (
    items: CartItem[],
    total: number,
  ): string => {
    const sep = "----------------------------";
    let message = "Hola! Quisiera hacer un pedido en *La Sarentina*:\n\n";
    message += `${sep}\n`;

    items.forEach((item, index) => {
      const unitPrice = parsePrice(item.price);
      const subtotal = unitPrice * item.quantity;
      message += `*${index + 1}. ${item.name}*\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      if (item.size) message += `   Tamaño: ${item.size}\n`;
      if (item.customizations && item.customizations.length > 0) {
        message += `   Extras: ${item.customizations.join(", ")}\n`;
      }
      message += `   Precio unitario: S/ ${unitPrice.toFixed(2)}\n`;
      if (item.quantity > 1) {
        message += `   Subtotal: S/ ${subtotal.toFixed(2)} (x${item.quantity})\n`;
      }
      message += `${sep}\n`;
    });

    message += `\n*TOTAL: S/ ${total.toFixed(2)}* (${totalItems} producto${totalItems !== 1 ? "s" : ""})\n\n`;
    message += "Podrian confirmar disponibilidad y coordinar la recogida?\n";
    message += "Gracias!";

    return message;
  };

  if (!state.isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/55 z-50 flex items-center justify-end p-4 sm:p-6"
        onClick={() => dispatch({ type: "CLOSE_CART" })}
      >
        <div
          className="bg-white w-full max-w-xs sm:max-w-sm max-h-full rounded-2xl overflow-y-auto shadow-2xl border border-[#C8A96E]/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif font-bold text-[#1C1008]">
                Tu Carrito
              </h2>
              <div className="flex items-center gap-2">
                {state.items.length > 0 && (
                  <button
                    onClick={() => dispatch({ type: "CLEAR_CART" })}
                    className="text-xs text-[#6B3A2A]/50 hover:text-red-500 transition-colors px-2 py-1"
                  >
                    Limpiar
                  </button>
                )}
                <button
                  onClick={() => dispatch({ type: "CLOSE_CART" })}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Items */}
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#6B3A2A]/60 mb-4">Tu carrito está vacío</p>
                <button
                  onClick={() => dispatch({ type: "CLOSE_CART" })}
                  className="bg-[#C8A96E] text-[#1C1008] px-6 py-2 rounded-lg font-medium hover:bg-[#B89B5C] transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {state.items.map((item: CartItem) => {
                    const unitPrice = parsePrice(item.price);
                    const subtotal = unitPrice * item.quantity;
                    return (
                      <div
                        key={item.id}
                        className="flex gap-3 p-4 bg-[#FBF8F3] border border-[#C8A96E]/10 rounded-xl"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[#1C1008] text-sm leading-tight">
                            {item.name}
                          </h3>

                          {/* Cantidad y tamaño */}
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-xs bg-[#1C1008]/5 text-[#6B3A2A] px-2 py-0.5 rounded-full font-medium">
                              ×{item.quantity}
                            </span>
                            {item.size && (
                              <span className="text-xs text-[#6B3A2A]/60">
                                {item.size}
                              </span>
                            )}
                          </div>

                          {/* Personalizaciones */}
                          {item.customizations &&
                            item.customizations.length > 0 && (
                              <p className="text-xs text-[#6B3A2A]/50 mt-1 truncate">
                                {item.customizations.join(", ")}
                              </p>
                            )}

                          {/* Precios */}
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-[#6B3A2A]/50">
                              S/ {unitPrice.toFixed(2)} c/u
                            </span>
                            <span className="text-sm font-bold text-[#C8A96E]">
                              S/ {subtotal.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Acciones */}
                        <div className="flex flex-col gap-1.5 flex-shrink-0">
                          <button
                            onClick={() => setEditingItem(item)}
                            className="p-1.5 text-[#C8A96E] hover:bg-[#C8A96E]/10 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() =>
                              dispatch({
                                type: "REMOVE_ITEM",
                                payload: item.id,
                              })
                            }
                            className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Total */}
                <div className="border-t border-[#C8A96E]/15 pt-4 mb-6">
                  <div className="flex justify-between items-center text-xs text-[#6B3A2A]/50 mb-1">
                    <span>{totalItems} producto{totalItems !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-[#1C1008]">Total</span>
                    <span className="text-xl font-bold text-[#C8A96E]">
                      S/ {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Reserve Button */}
                <button
                  onClick={handleReserve}
                  className="w-full bg-[#1C1008] text-[#C8A96E] py-3 px-6 rounded-xl font-medium hover:bg-[#2A1810] transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Reservar por WhatsApp
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal de edición — key fuerza remonte al cambiar de item */}
      {editingItem && (
        <ProductModal
          key={editingItem.id}
          item={editingItem}
          isOpen={true}
          onClose={() => setEditingItem(null)}
          cartItemId={editingItem.id}
          initialQuantity={editingItem.quantity}
          initialSize={editingItem.size}
          initialCustomizations={editingItem.customizations}
        />
      )}
    </>
  );
};
