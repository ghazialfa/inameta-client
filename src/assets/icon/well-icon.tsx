import { forwardRef } from "react"
import type { LucideProps } from "lucide-react"

export const WellIcon = forwardRef<SVGSVGElement, LucideProps>(function WellIcon({ size = 24, color = "currentColor", className, ...props }, ref) {
    return (
        <svg ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.06 21.08" width={size} height={size} fill={color} className={className} {...props}>
            <path d="M8.59,5.37H2.31c-.5,0-.9-.44-.9-1v-1.01c0-.56,.4-1.01,.9-1.01h6.28c.5,0,.9,.44,.9,1v1.01c0,.56-.4,1.01-.9,1.01Z" />
            <path d="M11.05,20.2l-2.37-13.54c-.05-.28-.27-.48-.53-.48H3.84s-.93,0-.93,0c-.26,0-.48,.2-.53,.49L.01,20.21c-.08,.45,.23,.88,.65,.88h.1c.28,0,.52-.22,.57-.53v-.02s4.19-3.81,4.19-3.81l4.21,3.82h0 c.05,.31,.29,.53,.57,.53h.1c.41,0,.72-.42,.64-.88ZM5.52,8.73l-.99-1.02h1.98s-.99,1.02-.99,1.02Zm2.03-.69l.59,3.37-1.94-1.99,1.35-1.38Zm-2.71,1.39l-1.91,1.97,.58-3.33,1.33,1.36Zm.68,.7l2.72,2.79-2.72,2.47-2.72-2.47,2.72-2.8ZM1.61,18.95l.87-4.98,2.31,2.09-3.18,2.89Zm4.64-2.89l2.33-2.11,.88,5.02-3.21-2.91Z" />
            <path d="M7.35,1.66H3.72c-.27,0-.49-.24-.49-.54V.55C3.23,.25,3.45,0,3.72,0h3.63c.27,0,.49,.24,.49,.54v.57c0,.3-.22,.55-.49,.55Z" />
        </svg>
    )
})

export default WellIcon
