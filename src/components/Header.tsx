import { supabase } from "../utils/supabase";
import { Menu } from "@headlessui/react"

async function signOut() {
  const { error } = await supabase.auth.signOut();
  console.log(error);
}
export default function Header() {
  return (
    <header className="min-h-200">
      <nav className="bg-neutral-800 h-30">
        <ul className="flex flex-row justify-around col text-white text-lg p-2 decoration-double font-medium">
          <li>
            <a href="agenda">Agenda</a>
          </li>
          <li>
            <a href="app">Estoque</a>
          </li>
          <li>
          <Menu>
            <Menu.Button>Configurações</Menu.Button>
            <Menu.Items className="display flex flex-col gap-1 text-sm">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${active && 'bg-basic'}`}
                    href="#"
                  >
                    Sua Conta
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${active && 'bg-basic'}`}
                    href="#"
                  >
                    Criar uma Conta
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${active && 'bg-basic'}`}
                    onClick={signOut}
                    
                  >
                    Sair
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
          </li>
        </ul>
      </nav>
    </header>
  );
}
