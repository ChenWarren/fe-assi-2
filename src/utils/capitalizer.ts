/**
 * Capitalizes the first letter of a string
 */

const capitalizer = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
export default capitalizer