interface Iprops {
  page: number;
  totalPages: number;
}

export default function Navigation({ page, totalPages }: Iprops) {
  return (
    <div>
      <p>{page}</p>
      <p>{totalPages}</p>
    </div>
  );
}
