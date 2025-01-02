import { AuthFeature } from "@/components/auth/AuthFeature";
import { DocumentIcon, TeamIcon, ChartIcon, ShieldCheckIcon } from "@/components/auth/AuthIcons";

export const LoginFeatures = () => {
  return (
    <div className="space-y-8">
      <AuthFeature
        icon={<DocumentIcon />}
        title="Gestão Centralizada"
        description="Todas as suas empresas em um só lugar"
      />
      <AuthFeature
        icon={<TeamIcon />}
        title="Colaboração em Equipe"
        description="Trabalhe em conjunto com sua equipe"
      />
      <AuthFeature
        icon={<ChartIcon />}
        title="Análises Avançadas"
        description="Insights e relatórios detalhados"
      />
      <AuthFeature
        icon={<ShieldCheckIcon className="w-6 h-6" />}
        title="Segurança Avançada"
        description="Proteção total dos seus dados empresariais"
      />
    </div>
  );
};