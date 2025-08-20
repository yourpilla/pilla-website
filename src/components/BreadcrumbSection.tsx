import Breadcrumb, { BreadcrumbItem } from './Breadcrumb'

interface BreadcrumbSectionProps {
  items: BreadcrumbItem[]
}

export default function BreadcrumbSection({ items }: BreadcrumbSectionProps) {
  if (items.length === 0) {
    return null
  }
  
  return <Breadcrumb items={items} />
}