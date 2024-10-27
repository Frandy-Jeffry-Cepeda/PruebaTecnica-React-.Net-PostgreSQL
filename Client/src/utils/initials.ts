
export function getInitials(name: string) {

    const split = name.split(" ");
    
    if (split.length === 4) {
      return (split[0][0] + split[2][0]).toUpperCase();
    } else if (split.length === 3) {
      return (split[0][0] + split[1][0]).toUpperCase();
    }
    
    return split.map(word => word[0]).join("").toUpperCase();
}