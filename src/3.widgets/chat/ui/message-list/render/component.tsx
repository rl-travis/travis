import { useEffect, useRef, useState } from "react";

import styles from "./render.module.scss";
import { v4 as hash } from "uuid";

import { ArrowBigDown } from "lucide-react";

import {
  BlockInitialInterface,
  BlockSendingInterface,
  BlockType,
  MessageItem,
  MessageItemSending,
  MessageType,
  NewMessageType,
} from "@/5.entities";

const MAX_HEIGHT = 10 ** 10;

function generateDate(v: number): string {
  return new Date(v).toLocaleDateString("RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function generateMessages(m: MessageType[]): BlockType[] {
  if (m.length === 0) return [];
  const res: BlockType[] = [];
  m = m.sort((a, b) => a._creationTime - b._creationTime);
  let date = generateDate(m[0]._creationTime);
  res.push({
    type: "date",
    d: date,
    h: hash(),
  });
  for (const mes of m) {
    const d = generateDate(mes._creationTime);
    if (d !== date) {
      date = d;
      res.push({
        type: "date",
        d: date,
        h: hash(),
      });
    }
    res.push({
      type: "initial",
      m: mes,
      h: hash(),
    });
  }
  return res;
}

function getHashSet(m: BlockType[]): Set<string> {
  const set: Set<string> = new Set();
  for (const block of m) {
    if (block.type === "initial") {
      set.add(block.m.hash);
    } else if (block.type === "sending") {
      set.add(block.hash);
    }
  }
  return set;
}

function getRange(m: BlockType[]): { older: number; newer: number } {
  m = m.filter((e) => e.type !== "date");
  const ans = {
    older: new Date().getTime(),
    newer: new Date().getTime(),
  };
  if (m.length === 0) return ans;
  ans.older =
    m[0].type === "initial"
      ? m[0].m._creationTime
      : m[0].type === "sending"
        ? m[0].date.getTime()
        : new Date().getTime();
  for (const block of m) {
    if (block.type === "initial") {
      ans.newer = block.m._creationTime;
    } else if (block.type === "sending") {
      ans.newer = block.date.getTime();
    }
  }
  return ans;
}

function Dates(m: BlockType[]): BlockType[] {
  m = m.filter((e) => e.type !== "date");
  if (m.length === 0) return [];
  let cur = generateDate(
    m[0].type === "initial"
      ? m[0].m._creationTime
      : m[0].type === "sending"
        ? m[0].date.getTime()
        : new Date().getTime(),
  );
  const ans: BlockType[] = [];
  ans.push({
    type: "date",
    d: cur,
    h: hash(),
  });
  for (const b of m) {
    let d;
    if (b.type === "sending") {
      d = generateDate(b.date.getTime());
    } else if (b.type === "initial") {
      d = generateDate(b.m._creationTime);
    } else {
      d = generateDate(new Date().getTime());
    }
    if (d !== cur) {
      cur = d;
      ans.push({
        type: "date",
        d: cur,
        h: hash(),
      });
    }
    ans.push(b);
  }
  return ans;
}

/**
 * Компонент требует рендериться заново, если изменился чат
 */
export function Render({
  messages,
  newMessages,
  loadMore,
}: {
  messages: MessageType[];
  newMessages: NewMessageType[];
  loadMore: (numItems: number) => void;
}) {
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const [firstRender, setFirstRender] = useState(false);
  const [lastHeight, setLastHeight] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function scroll(value: number) {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = value;
  }

  useEffect(() => {
    console.log("%c Первый рендер сообщений", "color: orange");
    if (blocks.length === 0) {
      setBlocks(Dates(generateMessages(messages)));
      setFirstRender(true);
      setTimeout(() => scroll(MAX_HEIGHT), 20);
    }
  }, []);

  useEffect(() => {
    console.log("%c Рендер отправляющихся сообщений", "color: orange");
    const m = newMessages[newMessages.length - 1];
    if (m) {
      setBlocks((prev) => {
        return Dates([
          ...prev,
          {
            type: "sending",
            hash: m.hash,
            value: m.value,
            date: m.date,
            chat: m.chat_id,
            user: m.user_id,
          },
        ]);
      });
      setTimeout(() => scroll(MAX_HEIGHT), 10);
    }
  }, [newMessages]);

  useEffect(() => {
    console.log("%c Рендер пришедших сообщений", "color: orange");
    const container = containerRef.current;
    if (firstRender && container) {
      const set = getHashSet(blocks);
      const m = messages
        .sort((a, b) => a._creationTime - b._creationTime)
        .filter((e) => !set.has(e.hash));
      const range = getRange(blocks);
      const older = m.filter((e) => e._creationTime < range.older);
      const newer = m.filter((e) => e._creationTime > range.newer);
      if (older.length > 0) {
        setBlocks((prev) => Dates([...generateMessages(older), ...prev]));
      }
      if (newer.length > 0) {
        setBlocks((prev) => Dates([...prev, ...generateMessages(newer)]));
        setTimeout(() => scroll(MAX_HEIGHT), 200);
      }
    }
    console.log("%c Скролл, когда пришли сверху новые сообщения", "color: orange");
    if (lastHeight && container && container.scrollTop === 0) {
      setTimeout(() => {
        scroll(container.scrollHeight - lastHeight);
      }, 100);
    }
  }, [messages]);

  function onScroll() {
    const container = containerRef.current;
    if (container && container.scrollTop === 0) {
      const { scrollHeight } = container;
      setLastHeight(scrollHeight);
      loadMore(52);
    }
    if (container && container.scrollHeight - container.scrollTop > 1000) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  }
  return (
    <>
      <div className={styles.list} ref={containerRef} onScroll={() => onScroll()}>
        {blocks.map((b) => {
          if (b.type === "date") {
            return (
              <div key={b.h} className={styles.block}>
                <div className={styles.date}>{b.d}</div>
              </div>
            );
          }

          if (b.type === "sending") {
            return <MessageItemSending key={b.hash} message={b} />;
          }

          return <MessageItem key={b.h} message={b.m} />;
        })}
      </div>
      {showScrollButton && (
        <button className={styles.down} onClick={() => scroll(MAX_HEIGHT)}>
          <ArrowBigDown size={20} />
        </button>
      )}
    </>
  );
}
