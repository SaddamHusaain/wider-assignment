import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useSelector } from 'react-redux';
import LayoutContainer from '../../components/layout';
import momemnt  from 'moment'
interface DataType {
  key: string;
  image: string;
  name: string;
  description: string;
  sku: string;
  quantity: number;
  price: number;
  totalprice: number;
  createdAt: number;
}

type DataIndex = keyof DataType;

function ViewAllOrders() {

  const orders = useSelector((state: any) => state.order)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Image",
      dataIndex: "image",
      render: (text, record) => (
        <img style={{ width: 80, height: 80, borderRadius: 20 }} src={record.image} />
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '20%',
      ...getColumnSearchProps('description'),
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      ...getColumnSearchProps('sku')
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      ...getColumnSearchProps('quantity'),
      sorter: (a, b) => a.quantity - b.quantity,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      ...getColumnSearchProps('price'),
      sorter: (a, b) => a.price - b.price,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Total Price',
      dataIndex: 'totalprice',
      key: 'totalprice',
      ...getColumnSearchProps('totalprice'),
      sorter: (a, b) => a.totalprice - b.totalprice,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (text, record) => (
        <span>{momemnt(record.createdAt).format("DD-MM-yyyy LT ")}</span>
      ),
      sorter: (a, b) => a.createdAt - b.createdAt,
      defaultSortOrder: "descend",
      sortDirections: ['descend', 'ascend'],
    },
  ];
  return (
    <LayoutContainer>
      <div style={{ display: "flex", width: "100%" }}>
        <Table style={{ width: "100%" }} columns={columns} dataSource={orders} />
      </div>
    </LayoutContainer>
  );
};

export default ViewAllOrders;