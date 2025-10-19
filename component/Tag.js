function Tag({ description, bgColor, txtColor, txtFont }) {

    return (
        <span 
            className={ `inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ring-gray-500/10 ${ txtFont ?? "font-gilroyMedium" } ${ bgColor ?? "bg-gray-50" } ${ txtColor ?? "text-gray-600" }` }>
            {description}
        </span>
    );

}
export default Tag;