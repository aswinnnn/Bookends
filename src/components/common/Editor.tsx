import isHotkey from 'is-hotkey'
import React, { KeyboardEvent, MouseEvent, useCallback, useMemo } from 'react'
import {
  Descendant,
  Editor,
  Element as SlateElement,
  Transforms,
  createEditor,
} from 'slate'
import { withHistory } from 'slate-history'
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  RenderPlaceholderProps,
  Slate,
  useSlate,
  withReact,
} from 'slate-react'
import { Button, Toolbar } from './Toolbar'
import {
  CustomEditor,
  CustomElement,
  CustomElementType,
  CustomElementWithAlign,
  CustomTextKey,
} from './custom-types'
import { Bars3BottomLeftIcon, Bars3BottomRightIcon, Bars3Icon, Bars4Icon, BoldIcon, CodeBracketIcon, H1Icon, H2Icon, ItalicIcon, ListBulletIcon, NumberedListIcon, UnderlineIcon } from '@heroicons/react/24/outline'

const HOTKEYS: Record<string, CustomTextKey> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list'] as const
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'] as const

type AlignType = (typeof TEXT_ALIGN_TYPES)[number]
type ListType = (typeof LIST_TYPES)[number]
type CustomElementFormat = CustomElementType | AlignType | ListType

const RichTextEditor = () => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  )
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  )
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  let timeoutId = 0;
  let prevJournal = '';

  const onChange = (value: Descendant[]) => {
    // Debounce writing at least 1 second
    // to avoid too many writes to the consol
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      if (JSON.stringify(value) === prevJournal) {
        return
      }
      prevJournal = JSON.stringify(value);
      console.log('', JSON.stringify(value));
    }, 1000)
  }

  return (
    <Slate editor={editor} initialValue={initialValue} onChange={onChange}>
      <Toolbar className="flex-wrap z-0">
        <MarkButton format="bold" Icon={<BoldIcon className='h-4 w-4 md:h-5 md:w-5' />} />
        <MarkButton format="italic" Icon={<ItalicIcon className="h-4 w-4 md:h-5 md:w-5 " />} />
        <MarkButton format="underline" Icon={<UnderlineIcon className="h-4 w-4 md:h-5 md:w-5 " />} />
        <MarkButton format="code" Icon={<CodeBracketIcon className="h-4 w-4 md:h-5 md:w-5 " />} />
        <BlockButton format="heading-one" Icon={<H1Icon className="h-4 w-4 md:h-5 md:w-5 " />} />
        <BlockButton format="heading-two" Icon={<H2Icon className="h-4 w-4 md:h-5 md:w-5 " />} />
        <BlockButton format="block-quote" Icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" fill="none" className="size-6 h-3 w-3 md:h-5 md:w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.25 15.5c-1.837-.794-2.5-1.5-2.5-3.5S15 8.75 17 8.75 20.25 10 20.25 12c0 3.5-1 4.75-5 7.25 1-1.75 1-2.25 1-3.75zm-10 0c-1.837-.794-2.5-1.5-2.5-3.5S5 8.75 7 8.75 10.25 10 10.25 12c0 3.5-1 4.75-5 7.25 1-1.75 1-2.25 1-3.75z"></path>
        </svg>} />
        <BlockButton format="numbered-list" Icon={<NumberedListIcon className="h-4 w-4 md:h-5 md:w-5 " />} />
        <BlockButton format="bulleted-list" Icon={<ListBulletIcon className="h-4 w-4 md:h-5 md:w-5 " />} />
        <BlockButton format="left" Icon={<Bars3BottomLeftIcon className="h-4 w-4 md:h-5 md:w-5 " />} />
        <BlockButton format="center" Icon={<Bars3Icon className="h-4 w-4 md:h-5 md:w-5 " />} />
        <BlockButton format="right" Icon={<Bars3BottomRightIcon className="h-4 w-4 md:h-5 md:w-5 " />} />
        <BlockButton format="justify" Icon={<Bars4Icon className="h-4 w-4 md:h-5 md:w-5 " />} />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Well, what's on your mind?"
        renderPlaceholder={({
          children,
          attributes,
        }: RenderPlaceholderProps) => (
          <div {...attributes}>
            <p className='py-4'>{children}</p>
          </div>
        )}
        spellCheck
        autoFocus
        className='w-full h-[73vh] bg-bookends-secondary text-bookends-text font-body text-lg py-4 px-2 rounded-lg wrap-anywhere shadow-inner resize-none focus:outline-none focus:ring-0 focus:ring-bookends-accent'
        onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
    </Slate>
  )
}

const toggleBlock = (editor: CustomEditor, format: CustomElementFormat) => {
  const isActive = isBlockActive(
    editor,
    format,
    isAlignType(format) ? 'align' : 'type'
  )
  const isList = isListType(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      isListType(n.type) &&
      !isAlignType(format),
    split: true,
  })
  let newProperties: Partial<SlateElement>
  if (isAlignType(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor: CustomEditor, format: CustomTextKey) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (
  editor: CustomEditor,
  format: CustomElementFormat,
  blockType: 'type' | 'align' = 'type'
) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n => {
        if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
          if (blockType === 'align' && isAlignElement(n)) {
            return n.align === format
          }
          return n.type === format
        }
        return false
      },
    })
  )

  return !!match
}

const isMarkActive = (editor: CustomEditor, format: CustomTextKey) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }: RenderElementProps) => {
  const style: React.CSSProperties = {}
  if (isAlignElement(element)) {
    style.textAlign = element.align as AlignType
  }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 className='text-[2.5rem] font-extrabold' style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

interface BlockButtonProps {
  format: CustomElementFormat
  Icon: JSX.Element
}

const BlockButton = ({ format, Icon }: BlockButtonProps) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        isAlignType(format) ? 'align' : 'type'
      )}
      onMouseDown={(event: MouseEvent<HTMLSpanElement>) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {Icon}
    </Button>
  )
}

interface MarkButtonProps {
  format: CustomTextKey
  Icon: JSX.Element
}

const MarkButton = ({ format, Icon }: MarkButtonProps) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: MouseEvent<HTMLSpanElement>) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      {Icon}
    </Button>
  )
}

const isAlignType = (format: CustomElementFormat): format is AlignType => {
  return TEXT_ALIGN_TYPES.includes(format as AlignType)
}

const isListType = (format: CustomElementFormat): format is ListType => {
  return LIST_TYPES.includes(format as ListType)
}

const isAlignElement = (
  element: CustomElement
): element is CustomElementWithAlign => {
  return 'align' in element
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [{ text: 'Try it out for yourself!' }],
  },
]

export default RichTextEditor