export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        'rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/80 ' +
        (props.className ?? '')
      }
    />
  )
}
