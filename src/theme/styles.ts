
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

export const components = {
    Tabs,
    Table,
    Menu
}

const styles = {
    components,
}
export default styles;