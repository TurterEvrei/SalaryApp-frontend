
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

const Alert = {
    variants: {
        toast: {
            closeButton: {
                color: "red.500",
                bg: "red.500"
            }
        }
    }
}

export const components = {
    Tabs,
    Table,
    Menu,
    Input,
    Alert,
}

const styles = {
    components,
}
export default styles;