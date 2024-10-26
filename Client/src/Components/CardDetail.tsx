import {Card, CardBody } from "@nextui-org/react";

type CardDetailProps = {
  content: String
  content2: String
  children: React.ReactNode
}

export default function CardDetail({content, content2, children}: CardDetailProps) {

  return (

    <Card className="mt-5">
        <CardBody>
            <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl text-gray-600">{content}</p>
                  <p className="text-xl font-semibold">{content2}</p>
                </div>
                {children}
            </div>
        </CardBody>
  </Card>

  )
}
