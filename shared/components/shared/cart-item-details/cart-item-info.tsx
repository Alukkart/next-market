import { cn } from "@/shared/lib/utils";

interface Props {
    name: string;
    details: string[];
    className?: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, details, className }) => {
    return (
        <div>
            <div className={cn("items-center justify-between", className)}>
                <h2 className="text-lg font-bold leading-6 text-wrap">{name}</h2>
            </div>

            {details && <p className="text-xs text-gray-400">{details}</p>}
        </div>
    );
};
