import { PageContainer } from "@/shared/components";

export default function Home() {
  return (
    <PageContainer title="Salsa Pro">
      <main className="flex flex-col items-center gap-8 w-full">
        <p className="text-xl text-center">
          Bienvenido a tu instructor de baile personal
        </p>

        {/* Placeholder for the main app content */}
        <div className="w-full p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
          <p className="text-center text-muted-foreground">
            Aquí irá el contenido principal de la aplicación
          </p>
        </div>
      </main>

      <footer className="mt-auto pt-8 pb-4 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Salsa Pro - Todos los derechos reservados
        </p>
      </footer>
    </PageContainer>
  );
}
