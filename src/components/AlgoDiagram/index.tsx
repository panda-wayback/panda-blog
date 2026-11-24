import type {ReactNode} from 'react';
import styles from './styles.module.css';

type AlgoDiagramProps = {
  caption?: string;
  children: ReactNode;
};

/** 算法概念示意外框；全站统一用这一套，不要各页私自画 ASCII / 散装 HTML。 */
export function AlgoDiagram({caption, children}: AlgoDiagramProps) {
  return (
    <figure className={styles.figure}>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
      {children}
    </figure>
  );
}

type AlgoDiagramRowProps = {
  children: ReactNode;
};

/** 横向排列多帧示意（如 push / pop 逐步）。 */
export function AlgoDiagramRow({children}: AlgoDiagramRowProps) {
  return <div className={styles.row}>{children}</div>;
}

/** 帧与帧之间的箭头。 */
export function AlgoDiagramArrow() {
  return (
    <div className={styles.connector} aria-hidden="true">
      →
    </div>
  );
}

type StackAction = 'push' | 'pop' | 'peek' | 'none';

type StackPanelProps = {
  /** 步骤号，如 1 */
  step?: number | string;
  /** 帧标题，如 push 2 */
  title?: string;
  /** 从栈底到栈顶 */
  items?: ReactNode[];
  /** 本帧动作（画在栈顶上方） */
  action?: StackAction;
  /** 动作旁说明，如「放入 2」 */
  actionLabel?: string;
  /** 帧下方说明；字符串时强调显示 */
  note?: ReactNode;
  emptyLabel?: string;
  /** 是否显示左侧「顶 / 底」 */
  showEnds?: boolean;
  /** 高亮下标（相对 items，底为 0） */
  hotIndex?: number;
  /** 画在栈顶上方：刚被拿走 / 正在离开的元素 */
  ejected?: ReactNode;
  ejectedLabel?: string;
};

const ACTION_ARROW: Record<Exclude<StackAction, 'none'>, string> = {
  push: '↓',
  pop: '↑',
  peek: '·',
};

/** 一列竖直栈格子；最上一格为栈顶。 */
export function StackPanel({
  step,
  title,
  items = [],
  action = 'none',
  actionLabel,
  note,
  emptyLabel = '空栈',
  showEnds = true,
  hotIndex,
  ejected,
  ejectedLabel = '离开',
}: StackPanelProps) {
  const topIndex = items.length - 1;
  const showAction = action !== 'none';
  const hasEjected = ejected != null && ejected !== '';

  return (
    <div className={styles.panel}>
      {step != null ? <div className={styles.step}>步骤 {step}</div> : null}
      {title ? <div className={styles.title}>{title}</div> : null}

      <div
        className={
          showAction && action === 'push'
            ? `${styles.action} ${styles.actionPush}`
            : showAction && action === 'pop'
              ? `${styles.action} ${styles.actionPop}`
              : styles.action
        }>
        {showAction ? (
          <>
            {actionLabel ? <span>{actionLabel}</span> : null}
            <span className={styles.actionArrow}>{ACTION_ARROW[action]}</span>
          </>
        ) : (
          <span className={styles.actionArrow} style={{visibility: 'hidden'}}>
            ↓
          </span>
        )}
      </div>

      <div className={styles.stackColumn}>
        {hasEjected ? (
          <div className={styles.stackEjected} aria-label="离开栈的元素">
            <div className={styles.stackEjectedCell}>{ejected}</div>
            <span className={styles.stackEjectedHint}>{ejectedLabel}</span>
          </div>
        ) : null}
        <div className={styles.body}>
          {showEnds ? (
            <div className={styles.rail} aria-hidden="true">
              <span className={styles.railTop}>顶</span>
              <span className={styles.railBottom}>底</span>
            </div>
          ) : null}
          {items.length === 0 ? (
            <div className={styles.empty}>{emptyLabel}</div>
          ) : (
            <div className={styles.stack} aria-label="栈，上方为栈顶、下方为栈底">
              {items.map((item, i) => {
                const isTop = i === topIndex;
                const isHot = hotIndex === i;
                const className = [
                  styles.cell,
                  isTop ? styles.topCell : '',
                  isHot ? styles.hotCell : '',
                ]
                  .filter(Boolean)
                  .join(' ');
                return (
                  <div key={i} className={className}>
                    {item}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {note != null && note !== '' ? (
        <div
          className={
            typeof note === 'string' ? `${styles.note} ${styles.noteEmph}` : styles.note
          }>
          {note}
        </div>
      ) : null}
    </div>
  );
}

type ArrayPanelProps = {
  title?: string;
  step?: number | string;
  /** 从左到右的格子 */
  items: ReactNode[];
  /** 高亮下标 */
  hot?: number[];
  /** 活跃区间 [lo, hi]；区间外变淡 */
  lo?: number;
  hi?: number;
  /** 中点下标（再加一圈强调） */
  mid?: number;
  /** 是否显示下标 */
  showIndex?: boolean;
  /** 下标起始值（前缀和常用 1） */
  indexBase?: number;
  note?: ReactNode;
};

/** 一维数组 / 区间示意（二分、前缀和等）。 */
export function ArrayPanel({
  title,
  step,
  items,
  hot = [],
  lo,
  hi,
  mid,
  showIndex = true,
  indexBase = 0,
  note,
}: ArrayPanelProps) {
  const hotSet = new Set(hot);
  const hasRange = lo != null && hi != null;

  return (
    <div className={styles.arrayPanel}>
      {step != null ? <div className={styles.step}>步骤 {step}</div> : null}
      {title ? <div className={styles.arrayTitle}>{title}</div> : null}
      <div className={styles.arrayStrip} aria-label="数组示意">
        {items.map((item, i) => {
          const dim = hasRange && (i < lo! || i > hi!);
          const isHot = hotSet.has(i);
          const isMid = mid === i;
          const className = [
            styles.arrayCell,
            dim ? styles.arrayCellDim : '',
            isHot ? styles.arrayCellHot : '',
            isMid ? styles.arrayCellMid : '',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <div key={i} className={styles.arrayCellWrap}>
              <div className={className}>{item}</div>
              {showIndex ? (
                <span className={styles.arrayIndex}>{indexBase + i}</span>
              ) : null}
            </div>
          );
        })}
      </div>
      {note != null && note !== '' ? (
        <div
          className={
            typeof note === 'string'
              ? `${styles.arrayNote} ${styles.arrayNoteEmph}`
              : styles.arrayNote
          }>
          {note}
        </div>
      ) : null}
    </div>
  );
}

type QueueAction = 'enqueue' | 'dequeue' | 'peek' | 'none';

type QueuePanelProps = {
  step?: number | string;
  title?: string;
  /** 从队首到队尾 */
  items?: ReactNode[];
  action?: QueueAction;
  actionLabel?: string;
  note?: ReactNode;
  emptyLabel?: string;
  showEnds?: boolean;
  /** 高亮下标（相对 items，队首为 0） */
  hotIndex?: number;
  /** 画在队首左侧：刚被拿走 / 正在离开的元素 */
  ejected?: ReactNode;
  ejectedLabel?: string;
};

/** 一列横向队列；左侧队首、右侧队尾。 */
export function QueuePanel({
  step,
  title,
  items = [],
  action = 'none',
  actionLabel,
  note,
  emptyLabel = '空队列',
  showEnds = true,
  hotIndex,
  ejected,
  ejectedLabel = '离开',
}: QueuePanelProps) {
  const showDequeue = action === 'dequeue' || action === 'peek';
  const showEnqueue = action === 'enqueue';

  return (
    <div className={styles.queuePanel}>
      {step != null ? <div className={styles.step}>步骤 {step}</div> : null}
      {title ? <div className={styles.title}>{title}</div> : null}

      <div className={styles.queueActions} aria-hidden="true">
        <div className={styles.queueActionSide}>
          {showDequeue ? (
            <>
              {actionLabel ? <span>{actionLabel}</span> : null}
              <span className={styles.queueActionArrow}>
                {action === 'peek' ? '·' : '←'}
              </span>
            </>
          ) : (
            <span className={styles.queueActionArrow} style={{visibility: 'hidden'}}>
              ←
            </span>
          )}
        </div>
        <div className={styles.queueActionSide}>
          {showEnqueue ? (
            <>
              {actionLabel ? <span>{actionLabel}</span> : null}
              <span className={styles.queueActionArrow}>→</span>
            </>
          ) : (
            <span className={styles.queueActionArrow} style={{visibility: 'hidden'}}>
              →
            </span>
          )}
        </div>
      </div>

      <div className={styles.queueBody}>
        <div className={styles.queueTrack}>
          {ejected != null && ejected !== '' ? (
            <div className={styles.queueEjected} aria-label="离开队列的元素">
              <div className={styles.queueEjectedCell}>{ejected}</div>
              <span className={styles.queueEjectedHint}>{ejectedLabel}</span>
            </div>
          ) : null}
          <div className={styles.queueMain}>
            {items.length === 0 ? (
              <div className={styles.queueEmpty}>{emptyLabel}</div>
            ) : (
              <div className={styles.queueStrip} aria-label="队列，左侧队首、右侧队尾">
                {items.map((item, i) => {
                  const isFront = i === 0;
                  const isHot = hotIndex === i;
                  const className = [
                    styles.queueCell,
                    isFront ? styles.queueFrontCell : '',
                    isHot ? styles.queueHotCell : '',
                  ]
                    .filter(Boolean)
                    .join(' ');
                  return (
                    <div key={i} className={className}>
                      {item}
                    </div>
                  );
                })}
              </div>
            )}
            {showEnds && items.length > 0 ? (
              <div className={styles.queueEnds}>
                <span className={styles.queueEndsFront}>队首</span>
                <span>队尾</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {note != null && note !== '' ? (
        <div
          className={
            typeof note === 'string' ? `${styles.note} ${styles.noteEmph}` : styles.note
          }>
          {note}
        </div>
      ) : null}
    </div>
  );
}
