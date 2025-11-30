function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`
        bg-white rounded-lg border border-slate-200 p-6
        ${hover ? 'transition-shadow hover:shadow-lg' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ children, className = '' }) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

function CardTitle({ children, className = '' }) {
  return <h3 className={`text-xl font-semibold text-primary ${className}`}>{children}</h3>
}

function CardDescription({ children, className = '' }) {
  return <p className={`text-slate-600 mt-1 ${className}`}>{children}</p>
}

function CardContent({ children, className = '' }) {
  return <div className={className}>{children}</div>
}

function CardFooter({ children, className = '' }) {
  return <div className={`mt-4 pt-4 border-t border-slate-100 ${className}`}>{children}</div>
}

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Footer = CardFooter

export default Card
