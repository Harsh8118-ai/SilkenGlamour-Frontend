import { useState, useEffect } from "react"
import { Link, useLocation } from 'react-router-dom'
import { Card } from "../ui/card"
import { Button } from "../ui/button"



export default function LeftCard() {
  
 const categories = [
    { name: "Nail Art", path: "/service/nailart" },
    { name: "Hair Care", path: "/service/haircare" },
    { name: "Mani-Pedi", path: "/service/mani-pedi" },
    { name: "Waxing", path: "/service/waxing" },
    { name: "Polish & Massage", path: "/service/body-polishing" },
    { name: "Threading & Wax", path: "/service/threading" },
    { name: "Bleach & De-Tan", path: "/service/bleach-dtan" },
    { name: "Wedding Package", path: "/service/weddingpackage" },
    { name: "Facial & Cleanup", path: "/service/facial-cleanup" },
  ]

  
  const location = useLocation()
  const [selectedCategory, setSelectedCategory] = useState("")

  // update selectedCategory whenever the URL changes
  useEffect(() => {
    const activeCategory = categories.find(cat => location.pathname.startsWith(cat.path))
    if (activeCategory) {
      setSelectedCategory(activeCategory.name)
    }
  }, [location.pathname])

  return (
    <>
    <div className="hidden sm:block w-[20%] mt-11 ml-16 p-4 ">

          <div className="w-full h-screen">
            <Card className="glass-card p-6 fixed px-6 top-24 shadow-sm shadow-MainBGColorYellow">
              <h2 className="text-xl font-semibold mb-6 text-foreground">Service Categories</h2>
              <div className="space-y-3">
                {categories.map((category) => (
                  <Link key={category.name} to={category.path} className="flex gap-2">
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "ghost"}
                    className={`w-full justify-start pill-button hover-glow border border-white/25 ${
                      selectedCategory === category.name ? "bg-BGColorYellow text-white" : "hover:bg-accent/10"
                    }`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name}
                  </Button>
                  </Link>
                ))}
              </div>
            </Card>
          </div>

        </div>
    </>
  )
}
