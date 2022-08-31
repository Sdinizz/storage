import { FormEvent, useEffect, useRef, useState } from "react";
import { Product } from "../types/Product";
import { supabase } from "../utils/supabase";

export default function Storage() {
  // const tableData = selectProduct();
  const productNameRef = useRef<HTMLInputElement>(null);
  const productPriceRef = useRef<HTMLInputElement>(null);
  const productQuantityRef = useRef<HTMLInputElement>(null);
  const [tableData, setTableData] = useState<Product[] | null>(null);

  async function insertProduct(e: FormEvent) {
    e.preventDefault();
    const productName = productNameRef.current?.value;
    const productPrice = productPriceRef.current?.value;
    const productQuantity = productQuantityRef.current?.value;

    if (!productName) {
      productNameRef.current?.focus();
      return;
    }
    if (productPrice) {
      productPriceRef.current?.focus();
    }
    if (!productQuantity) {
      productQuantityRef.current?.focus();
      return;
    }

    const { data, error } = await supabase
      .from("product")
      .insert([{ product_name: productName, product_quantity: productQuantity, product_price: productPrice }]);
    console.log(error);
  }
  async function selectProduct() {
    const { data } = await supabase.from<Product>("product").select().throwOnError()
    return data
  }
  useEffect(() => {
    selectProduct().then((data) => setTableData(data)).catch((err) => console.error(err)
    )
  }, [])
  return (
    <main className="mt-10">
      <div className="flex justify-center text-white">
        <section className="flex flex-col gap-10">
          <h1 className="text-3xl">Adicione um produto</h1>
          <form onSubmit={insertProduct} className="flex justify-center flex-col gap-3">
            <label>Nome:</label>
            <input
              className="border border-black border-2 text-black"
              type="text"
              ref={productNameRef}
            />
            <label>Preço:</label>
            <input
              className="border border-black border-2 text-black"
              type="number"
              ref={productPriceRef}
            />
            <label>Quantidade:</label>
            <input
              className="border border-black border-2 text-black"
              type="number"
              ref={productQuantityRef}
            />
            <button type="submit">Adicionar</button>
          </form>
          <table className="border-collapse border border-white ...">
            <thead>
              <tr>
                <th className="border border-white">Nome</th>
                <th className="border border-white">Quantidade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-white">product1</td>
                <td className="border border-white">product1_qty</td>
              </tr>
              <tr>
                <td className="border border-white">product2</td>
                <td className="border border-white">product2_qty</td>
              </tr>
              <tr>
                <td className="border border-white">product3</td>
                <td className="border border-white">product3_qty</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
