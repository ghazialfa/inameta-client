"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import logoIcon from "@/assets/img/icons/icon.png"
import wellImage from "@/assets/img/well.png"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"
// import { useState, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { useAuthStore } from "@/store/auth"
import { useRouter } from "next/navigation"
import { z } from "zod"

export default function LoginPage() {
    const [isVisible, setIsVisible] = useState(false)
    const [errors, setErrors] = useState<{ username?: string; password?: string; root?: string }>({})
    const router = useRouter()
    // const token = useAuthStore((s) => s.token)
    // const hydrated = useAuthStore((s) => s.hydrated)

    const loginSchema = z.object({
        username: z.string().min(3, "Username must be at least 3 characters"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        remember: z.boolean().optional(),
    })

    const mutation = useMutation({
        mutationFn: async (payload: { username: string; password: string }) => {
            const res = await api.post("/login", payload)

            return res.data as { token: string; user?: { id?: string } }
        },
        onSuccess: (data) => {
            const token = data?.token
            const userId = data?.user?.id ?? null
            if (token) {
                useAuthStore.getState().setAuth(token, userId ?? null)
                router.push("/")
            }
        },
        onError: () => {
            setErrors((prev) => ({ ...prev, root: "Login failed. Please check your username and password." }))
        },
    })

    //!bypass login for debugging tanpa api!!!
    // useEffect(() => {
    //     if (hydrated && token) router.replace("/")
    // }, [hydrated, token, router])

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="relative hidden lg:block">
                <Image src={wellImage} alt="Well" fill className="absolute inset-0 object-cover" priority />
            </div>
            <div className="flex flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <div className="flex justify-center mb-4">
                        <Image src={logoIcon} alt="Inameta Lite" height={48} />
                    </div>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault()
                            setErrors({})
                            const form = e.currentTarget
                            const formData = new FormData(form)
                            const raw = {
                                username: String(formData.get("username") || ""),
                                password: String(formData.get("password") || ""),
                                remember: Boolean(formData.get("remember")),
                            }
                            const parsed = loginSchema.safeParse(raw)
                            if (!parsed.success) {
                                const fieldErrors: typeof errors = {}
                                parsed.error.issues.forEach((i) => {
                                    if (i.path[0] === "username") fieldErrors.username = i.message
                                    else if (i.path[0] === "password") fieldErrors.password = i.message
                                })
                                setErrors(fieldErrors)
                                return
                            }
                            mutation.mutate({ username: parsed.data.username, password: parsed.data.password })
                        }}
                    >
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-1 text-center">
                                <h1 className="text-2xl font-bold">Good Morning</h1>
                                <p className="text-muted-foreground text-sm text-balance">Enter your credentials to access your workspace</p>
                            </div>
                            <Field data-invalid={Boolean(errors.username)}>
                                <FieldLabel htmlFor="username">Username</FieldLabel>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    aria-invalid={Boolean(errors.username)}
                                    required
                                />
                                {errors.username && <FieldDescription>{errors.username}</FieldDescription>}
                            </Field>
                            <Field data-invalid={Boolean(errors.password)}>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={isVisible ? "text" : "password"}
                                        placeholder="Enter your password"
                                        aria-invalid={Boolean(errors.password)}
                                        required
                                        className="pr-10"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsVisible((prevState) => !prevState)}
                                        className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent z-10"
                                        type="button"
                                        aria-label={isVisible ? "Hide password" : "Show password"}
                                    >
                                        {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                                        <span className="sr-only">{isVisible ? "Hide password" : "Show password"}</span>
                                    </Button>
                                </div>
                                {errors.password && <FieldDescription>{errors.password}</FieldDescription>}
                            </Field>
                            <Field orientation="horizontal">
                                <input id="remember" name="remember" type="checkbox" className="size-4 rounded border" />
                                <FieldDescription>
                                    <label htmlFor="remember">Remember me</label>
                                </FieldDescription>
                            </Field>
                            <Field>
                                <Button type="submit" className="w-full" disabled={mutation.isPending}>
                                    {mutation.isPending ? "Signing In..." : "Sign In"}
                                </Button>
                                {errors.root && <FieldDescription>{errors.root}</FieldDescription>}
                            </Field>
                        </FieldGroup>
                    </form>
                    <div className="text-muted-foreground mt-10 flex justify-between text-xs">
                        <span>Terms and Conditions</span>
                        <span>© INAMETA 2025</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
