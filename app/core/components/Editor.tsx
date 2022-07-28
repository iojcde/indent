import React, { useRef, useState } from "react"

import SplitPane from "react-split-pane"
import TextareaMarkdown, { TextareaMarkdownRef } from "textarea-markdown-editor"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypePrism from "rehype-prism-plus"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"

import { FiColumns, FiEdit2, FiEye } from "react-icons/fi"
import { RadioGroup } from "@headlessui/react"

export interface File {
  filename: string
  content: string
  id: string
}

const Preview: React.FC<{ content: string }> = ({ content }) => (
  <div className="overflow-y-auto w-full h-full bg-white border rounded-r-md ">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, [rehypePrism, { ignoreMissing: true }]]}
      className="prose prose-slate max-w-none p-4 w-full h-full break-all"
    >
      {content}
    </ReactMarkdown>
  </div>
)

const Editor: React.FC<{
  filename: string
  content: string
  remove?: () => void
  setFilename: (filename: string) => void
  onContentChange: React.ChangeEventHandler
  readonly?: boolean
}> = ({ filename, content, onContentChange, readonly }) => {
  const [layout, setLayout] = useState<"editor" | "both" | "preview">("editor")

  const ref = useRef<TextareaMarkdownRef>(null)

  return (
    <div className={`editor w-full ${layout != "both" ? "max-w-5xl px-6" : ""}`}>
      <div className={`block border rounded-lg p-4  `}>
        <div className="flex justify-between">
          <input
          readOnly={readonly}
            placeholder={filename ? filename : "asdf.md"}
            className="p-2 rounded-md outline-none border "
          />
          <RadioGroup value={layout} onChange={setLayout} className="flex gap-2">
            <RadioGroup.Label className="sr-only">Layout</RadioGroup.Label>
            <RadioGroup.Option value="editor">
              {({ checked }) => (
                <div
                  className={`p-2 rounded-md border text-neutral-600 transition ${
                    checked ? "bg-blue-200 shadow" : ""
                  }`}
                >
                  <FiEdit2 size={18} />
                </div>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="both">
              {({ checked }) => (
                <div
                  className={`p-2 rounded-md border text-neutral-600 transition ${
                    checked ? "bg-blue-200 shadow" : ""
                  }`}
                >
                  <FiColumns size={18} />
                </div>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="preview">
              {({ checked }) => (
                <div
                  className={`p-2 rounded-md border text-neutral-600 transition ${
                    checked ? "bg-blue-200 shadow" : ""
                  }`}
                >
                  <FiEye size={18} />
                </div>
              )}
            </RadioGroup.Option>
          </RadioGroup>
        </div>

        <div className="relative min-h-[60vh] mt-4">
          {layout == "editor" && (
            <TextareaMarkdown.Wrapper ref={ref}>
              <textarea
                readOnly={readonly}
                value={content}
                onChange={onContentChange}
                className={`prose max-w-none prose-sm prose-neutral outline-none scrollbar p-4 w-full border font-mono h-full resize-none rounded-md ${
                  readonly ? "" : ""
                }`}
              />
            </TextareaMarkdown.Wrapper>
          )}
          {layout == "preview" && <Preview content={content} />}
          {layout == "both" && (
            <>
              {/* @ts-ignore */}
              <SplitPane defaultSize="50%">
                <TextareaMarkdown.Wrapper ref={ref}>
                  <textarea
                    value={content}
                    readOnly={readonly}
                    onChange={onContentChange}
                    className="prose max-w-none prose-sm prose-neutral outline-none scrollbar p-4 w-full border font-mono rounded-l-md h-full resize-none "
                  />
                </TextareaMarkdown.Wrapper>
                <Preview content={content} />
              </SplitPane>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default Editor
