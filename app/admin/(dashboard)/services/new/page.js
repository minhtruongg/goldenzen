import NewServiceForm from './NewServiceForm';

export default function NewServicePage() {
  return (
    <>
      <div className="admin-header">
        <a href="/admin/services" style={{ fontSize: 15 }}>&larr; Quay lại</a>
      </div>
      <div style={{ padding: '18px 0' }}>
        <div style={{ fontSize: 24, fontFamily: 'Playfair Display, Georgia, serif' }}>Thêm dịch vụ mới</div>
      </div>
      <NewServiceForm />
    </>
  );
}
