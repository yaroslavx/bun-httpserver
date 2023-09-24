export const SimpleComponentList = ({ components }: { components: { name: string; url: string }[] }) => {
    return <ul>{
        components.map(({ name }) => {
            return <li key={name}>
                <a href={`/simple/${name}`}>{name}</a>
            </li>
        })}</ul>
}