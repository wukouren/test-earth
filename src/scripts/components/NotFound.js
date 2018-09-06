import { connect } from 'dva';

function NotFound() {
  return (
    <div className="eps-page-404">
      <i></i>
      <p>哇哦 您访问的地址不存在</p>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(NotFound);

