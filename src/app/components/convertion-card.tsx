import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface ConversionCardProps {
  from: string;
  to: string;
  iconFrom: string;
  iconTo: string;
  bgColor: string;
  url: string;
}

export function ConversionCard({
  from,
  to,
  iconFrom,
  iconTo,
  bgColor,
  url,
}: ConversionCardProps) {
  return (
    <Card className="overflow-hidden shadow-xl hover:shadow-xl transition-shadow duration-300 w-[300px]">
      <CardContent className="p-6 bg-white">
        <div className="flex items-center justify-center mb-6">
          <Image
            src={iconFrom}
            alt={`${from} a ${to}`}
            width={50}
            height={50}
          />
          <span className="mx-2 text-2xl font-bold text-gray-700">→</span>
          <Image src={iconTo} alt={`${from} a ${to}`} width={50} height={50} />
        </div>

        <Link href={url}>
          <div className="flex justify-center rounded-md">
            <Button
              className={`w-full ${bgColor} text-white transition-colors`}
            >
              <span className="font-bold">
                {from} a {to}
              </span>
            </Button>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
