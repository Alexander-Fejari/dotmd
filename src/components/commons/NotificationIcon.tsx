"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"

type Notification = {
  id: string
  title: string
  message: string
  time: string
  read: boolean
}

export function NotificationIcon() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Erreur GitHub",
      message: "Impossible d'accéder à votre repository",
      time: "Il y a 5 minutes",
      read: false,
    },
    {
      id: "2",
      title: "Mise à jour disponible",
      message: "Une nouvelle version de dotMD est disponible",
      time: "Il y a 2 heures",
      read: false,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} non lues)` : ""}`}
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-red-500" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end" role="dialog" aria-label="Panneau des notifications">
        <header className="flex items-center justify-between border-b px-4 py-2">
          <h2 className="font-medium">Notifications</h2>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground"
              onClick={markAllAsRead}
              aria-label="Marquer toutes les notifications comme lues"
            >
              Marquer tout comme lu
            </Button>
          )}
        </header>
        <section className="max-h-80 overflow-y-auto" role="list">
          {notifications.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">Aucune notification</p>
          ) : (
            <ul>
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`border-b p-4 cursor-pointer hover:bg-muted/50 ${!notification.read ? "bg-muted/50" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                  role="listitem"
                >
                  <article className="flex items-start justify-between">
                    <header>
                      <h3 className="font-medium">{notification.title}</h3>
                      <time className="text-xs text-muted-foreground">{notification.time}</time>
                    </header>
                  </article>
                  <p className="mt-1 text-sm">{notification.message}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </PopoverContent>
    </Popover>
  )
}
