
interface Props {
    id: string,
    className?: string,
    children: React.ReactNode | React.ReactNode[],
    onSubmit: () => void
}

const Form = ({
    id,
    className,
    children,
    onSubmit
}: Props) => {
    return (
        <form
          id={id}
          className={className}
          onSubmit={onSubmit}
        >
            {children}
        </form>
    );
};


export default Form;