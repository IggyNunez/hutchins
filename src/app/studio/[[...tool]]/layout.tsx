import '../studio-override.css'

export const metadata = {
  title: 'Hutchins Data Strategy | Studio',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
