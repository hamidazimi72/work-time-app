import * as React from 'react';

// ______________________________* Container *______________________________//
export const Container = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
	({ className = '', ...props }, ref) => (
		<div className='w-full overflow-auto p-[1px]'>
			<table ref={ref} className={`w-full caption-bottom text-sm ${className}`} {...props} />
		</div>
	),
);

// ______________________________* Head *______________________________//
export const Header = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
	({ className = '', ...props }, ref) => <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />,
);

// ______________________________* Body *______________________________//
export const Body = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
	({ className = '', ...props }, ref) => <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />,
);

// ______________________________* Footer *______________________________//
export const Footer = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
	({ className = '', ...props }, ref) => (
		<tfoot ref={ref} className={`bg-primary-1 font-medium text-primary-foreground ${className}`} {...props} />
	),
);

// ______________________________* Row *______________________________//
export const Row = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
	({ className = '', ...props }, ref) => (
		<tr
			ref={ref}
			className={`border-b transition-colors hover:bg-primary-1 data-[state=selected]:bg-primary-1 ${className}`}
			{...props}
		/>
	),
);

// ______________________________* Head *______________________________//
export const Head = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
	({ className = '', ...props }, ref) => (
		<th
			ref={ref}
			className={`h-12 px-4 align-middle font-medium text-primary-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
			{...props}
		/>
	),
);

// ______________________________* Cell *______________________________//
export const Cell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
	({ className = '', ...props }, ref) => (
		<td ref={ref} className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
	),
);

// ______________________________* Caption *______________________________//
export const Caption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
	({ className = '', ...props }, ref) => (
		<caption ref={ref} className={`pt-4 text-sm text-primary-foreground ${className}`} {...props} />
	),
);

{
	/*	
<table.Container className='text-center'>
  <table.Header>
    <table.Row>
      <table.Head>Head 1</table.Head>
      <table.Head>Head 2</table.Head>
      <table.Head>Head 3</table.Head>
      <table.Head>Head 4</table.Head>
    </table.Row>
  </table.Header>
  <table.Body>
    {new Array(3).fill(' ').map((item, i) => (
      <table.Row key={i}>
        <table.Cell>Cell {i}</table.Cell>
        <table.Cell>Cell {i}</table.Cell>
        <table.Cell>Cell {i}</table.Cell>
        <table.Cell>Cell {i}</table.Cell>
      </table.Row>
    ))}
  </table.Body>
  <table.Footer>
    <table.Row>
      <table.Head>Footer 1</table.Head>
      <table.Head>Footer 2</table.Head>
      <table.Head>Footer 3</table.Head>
      <table.Head>Footer 4</table.Head>
    </table.Row>
  </table.Footer>
  <table.Caption>Bottom Caption</table.Caption>
</table.Container>
 */
}
