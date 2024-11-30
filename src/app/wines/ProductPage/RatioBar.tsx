export default function RatioBar(props: { total: number; count: number }) {
  return (
    <div>
      {props.count} / {props.total}
    </div>
  );
}
