import React from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { Menu } from '@headlessui/react'
import { EllipsisVerticalIcon, TrashIcon, InformationCircleIcon, ShareIcon, BookmarkIcon } from '@heroicons/react/24/outline'

interface CardProps {
  title: string
  content: string
  createdAt: Date
  lastEdited?: Date
  backgroundImage?: string
  tags?: string[]
  onDelete?: () => void
  onViewInfo?: () => void
  onShare?: () => void
  onBookmark?: () => void
}

const Card: React.FC<CardProps> = ({ 
  title, 
  content, 
  createdAt, 
  lastEdited, 
  backgroundImage, 
  tags,
  onDelete,
  onViewInfo,
  onShare,
  onBookmark 
}) => {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.08] shadow-md backdrop-blur-md">
      {/* Menu Button */}
      <div className="absolute right-2 top-2 z-20">
        <Menu as="div" className="relative">
          <Menu.Button className="hover:rounded-full p-2 hover:bg-white/20">
            <EllipsisVerticalIcon className="h-5 w-5 text-white" />
          </Menu.Button>

          <Menu.Items className="glass-blur absolute right-0 mt-1 w-48 origin-top-right rounded-xl border border-white/10 bg-white/20 p-1 shadow-lg  ring-1 ring-black/5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onViewInfo}
                  className={`${
                    active ? 'bg-white/30' : ''
                  } flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80`}
                >
                  <InformationCircleIcon className="h-4 w-4" />
                  View Info
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onBookmark}
                  className={`${
                    active ? 'bg-white/30' : ''
                  } flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80`}
                >
                  <BookmarkIcon className="h-4 w-4" />
                  Save
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onShare}
                  className={`${
                    active ? 'bg-white/30' : ''
                  } flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80`}
                >
                  <ShareIcon className="h-4 w-4" />
                  Share
                </button>
              )}
            </Menu.Item>
            <div className="my-1 border-t border-white/10" />
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onDelete}
                  className={`${
                    active ? 'bg-red-500/10' : ''
                  } flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400`}
                >
                  <TrashIcon className="h-4 w-4" />
                  Delete
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>

      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 h-full w-full">
          <img
            src={backgroundImage}
            alt={title}
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
        </div>
      )}

      {/* Card Content */}
      <div className="relative z-10 flex h-full flex-col p-6">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex grow flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h3 className="font-display text-xl font-bold text-white/90">{title}</h3>
              {lastEdited && (
                <p className="text-xs text-white/40">
                  Edited {formatDistanceToNow(lastEdited, { addSuffix: false })} ago
                </p>
              )}
            <p className="font-body line-clamp-3 text-sm text-white/70">{content}</p>
          </div>

          <div className="flex font-mono items-center justify-between border-t border-white/10 pt-4">
            <div>
              <time 
                dateTime={createdAt.toISOString()} 
                className="text-xs text-white/50"
              >
                {format(createdAt, 'MMM d, yyyy • H:mm')}
              </time>
            </div>
            <span className="text-xs text-white/50">
              {formatDistanceToNow(createdAt, { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card