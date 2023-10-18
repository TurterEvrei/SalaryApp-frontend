
const Tabs = {
    baseStyle: {
        tab: {
            _selected: {
                color: 'primary.100',
            }
        }
    }
}

const Table = {
    variants: {
        simple: {
            th: {
                borderColor: "dark.300"
            },
            td: {
                borderColor: "dark.300"
            }
        }
    }
}

const Menu = {
    baseStyle: {
        item: {
            letterSpacing: 1
        }
    }
}

const Input = {
    defaultProps: {
        focusBorderColor: "primary.100"
    }
}

export const components = {
    Tabs,
    Table,
    Menu,
    Input,
}

const styles = {
    components,
}
export default styles;