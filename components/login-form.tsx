import Link from "next/link"
import Image from "next/image";

import { Separator } from "@/components/ui/separator"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  return (
    <Card className="mx-auto  px-7">
      
      <CardHeader>
        <Image
          className=" mx-auto "
          src="/usp-logo.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        ></Image>
        <CardDescription className="text-center font-bold	text-black pb-3 mx-auto  ">
          Plataforma de simulados do cursinho popular da EACH-USP
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>

            </div>
            <Input id="password" type="password" required />
          </div>
          <p className="ml-auto mr-2 text-sm inline-block" >
          <Link href="#" className="  underline text-violet-700">
          Esqueceu sua senha? 

              </Link></p>
          <Button variant="ghost" type="submit" className="text-white font-medium w-full bg-orange-500 hover:bg-transparent hover:border-transparent hover:shadow-none  !important">
            Login
          </Button>
          <Button variant="outline" className="w-full">
          <Image
          className=" mx-2"
          src="/google-icon.png"
          alt="Next.js Logo"
          width={18}
          height={10}
          priority
        ></Image>
            Login com o Google
          </Button>
          <Separator className='my-2'></Separator>

        </div>
        <div className="mt-4 text-center text-sm ">
          Ainda não possui uma conta?{" "}
          <Link href="#" className="underline text-violet-700">
            Cadastre-se
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
