import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

function AccordionItem({ title, children, isOpen, onToggle }) {
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        className="w-full py-4 flex items-center justify-between text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-slate-800">{title}</span>
        <ChevronDown
          size={20}
          className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <div className="text-slate-600">{children}</div>
      </div>
    </div>
  )
}

function Accordion({ items, allowMultiple = false }) {
  const [openItems, setOpenItems] = useState([])

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      )
    } else {
      setOpenItems((prev) =>
        prev.includes(index) ? [] : [index]
      )
    }
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-200">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openItems.includes(index)}
          onToggle={() => toggleItem(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  )
}

export default Accordion
