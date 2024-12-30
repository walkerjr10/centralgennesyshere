import { Suspense } from "react";
import { motion } from "framer-motion";
import { CompanyTypeCard } from "./CompanyTypeCard";

const companyTypes = [
  { type: "Holding", count: 8 },
  { type: "Family Office", count: 5 },
  { type: "Corporate", count: 12 },
  { type: "Agro", count: 6 },
  { type: "Industrial", count: 10 },
  { type: "Retail", count: 7 },
];

export function CompanyTypeGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companyTypes.map((company, index) => (
        <Suspense
          key={company.type}
          fallback={
            <div className="h-48 bg-gray-100 rounded-lg animate-pulse" />
          }
        >
          <CompanyTypeCard
            type={company.type}
            count={company.count}
            index={index}
          />
        </Suspense>
      ))}
    </div>
  );
}