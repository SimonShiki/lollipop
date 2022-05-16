const { Extension, type, api } = require('clipcc-extension');

class Lollipop extends Extension {
    constructor () {
        super();
        this.hasReported = false;
        this.factorial.bind(this);
    }
    onInit() {
        api.addCategory({
            categoryId: 'shiki.lollipop.category',
            messageId: 'shiki.lollipop.category',
            color: '#e7659f'
        });
        api.addBlock({
            opcode: 'shiki.lollipop.split',
            type: type.BlockType.REPORTER,
            messageId: 'shiki.lollipop.split',
            categoryId: 'shiki.lollipop.category',
            param: {
                STRING: {
                    type: type.ParameterType.STRING,
                    default: 'A quick fox'
                },
                SEPARATOR: {
                    type: type.ParameterType.STRING,
                    default: ' '
                }
            },
            function: (args) => {
                const string = args.STRING.toString();
                return JSON.stringify(string.split(args.SEPARATOR));
            }
        });
        api.addBlock({
            opcode: 'shiki.lollipop.join',
            type: type.BlockType.REPORTER,
            messageId: 'shiki.lollipop.join',
            categoryId: 'shiki.lollipop.category',
            param: {
                ARRAY: {
                    type: type.ParameterType.STRING,
                    default: `["A", "quick", "fox"]`
                },
                SEPARATOR: {
                    type: type.ParameterType.STRING,
                    default: ' '
                }
            },
            function: (args) => {
                try {
                    const array = JSON.parse(args.ARRAY);
                    return array.join(args.SEPARATOR);
                } catch (e) {
                    return e;
                }
            }
        });
        api.addBlock({
            opcode: 'shiki.lollipop.exec',
            type: type.BlockType.REPORTER,
            messageId: 'shiki.lollipop.exec',
            categoryId: 'shiki.lollipop.category',
            param: {
                STRING: {
                    type: type.ParameterType.STRING,
                    default: 'The Quick Brown Fox Jumps Over The Lazy Dog'
                },
                REGEX: {
                    type: type.ParameterType.STRING,
                    default: `/quick\s(brown).+?(jumps)/ig`
                }
            },
            function: (args) => {
                const reg = new RegExp(args.REGEX);
                return reg.exec(args.STRING);
            }
        });
        api.addBlock({
            opcode: 'shiki.lollipop.test',
            type: type.BlockType.BOOLEAN,
            messageId: 'shiki.lollipop.test',
            categoryId: 'shiki.lollipop.category',
            param: {
                STRING: {
                    type: type.ParameterType.STRING,
                    default: 'The Quick Brown Fox Jumps Over The Lazy Dog'
                },
                REGEX: {
                    type: type.ParameterType.STRING,
                    default: `/quick\s(brown).+?(jumps)/ig`
                }
            },
            function: (args) => {
                const reg = new RegExp(args.REGEX);
                return reg.test(args.STRING);
            }
        });
        api.addBlock({
            opcode: 'shiki.lollipop.ternary',
            type: type.BlockType.REPORTER,
            messageId: 'shiki.lollipop.ternary',
            categoryId: 'shiki.lollipop.category',
            param: {
                CONDITION: {
                    type: type.ParameterType.BOOLEAN
                },
                TRUE: {
                    type: type.ParameterType.STRING,
                    default: "1"
                },
                FALSE: {
                    type: type.ParameterType.STRING,
                    default: "0"
                }
            },
            function: (args) => {
                if (args.CONDITION) return args.TRUE;
                return args.FALSE;
            }
        });
        api.addBlock({
            opcode: 'shiki.lollipop.true',
            type: type.BlockType.BOOLEAN,
            messageId: 'shiki.lollipop.true',
            categoryId: 'shiki.lollipop.category',
            function: () => {
                return true;
            }
        });
        api.addBlock({
            opcode: 'shiki.lollipop.false',
            type: type.BlockType.BOOLEAN,
            messageId: 'shiki.lollipop.false',
            categoryId: 'shiki.lollipop.category',
            function: () => {
                return false;
            }
        });
        api.addBlock({
            opcode: 'shiki.lollipop.hat',
            type: type.BlockType.HAT,
            messageId: 'shiki.lollipop.hat',
            categoryId: 'shiki.lollipop.category',
            param: {
                CONDITION: {
                    type: type.ParameterType.BOOLEAN
                }
            },
            function: (args) => {
                if (!!this.hasReported) {
                    this.hasReported = false;
                    return false;
                }
                const result = !!args.CONDITION;
                if (result) {
                    this.hasReported = true;
                    return true;
                }
                return false;
            }
        });
        api.addBlock({
            opcode: 'shiki.lollipop.factorial',
            type: type.BlockType.REPORTER,
            messageId: 'shiki.lollipop.factorial',
            categoryId: 'shiki.lollipop.category',
            param: {
                NUM: {
                    type: type.ParameterType.NUMBER,
                    default: '1'
                }
            },
            function: (args) => {
                return this.factorial(Number(args.NUM));
            }
        });
    }

    factorial (num) {
        if (num === 0) return 1;
        return num * this.factorial(num - 1);
    }

    onUninit () {
        api.removeCategory('shiki.lollipop.category');
    }
}

module.exports = Lollipop;
