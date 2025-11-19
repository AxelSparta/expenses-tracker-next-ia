import { checkUser } from "@/lib/checkUser"

export async function Navbar () {
  const user = await checkUser()
  return <div>Navbar</div>
}
