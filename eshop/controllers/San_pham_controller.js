const product = require('../models/San_pham');

exports.info = async (req, res, next) => {
    // const data = {
    //     tensp: 'iPhone XS Max 64 GB',
    //     brand: 'Apple',
    //     price: '28,790,000',
    //     color: ['Bạc', 'Vàng', 'Xám'],
    //     shortInfo: ['Hệ điều hành: iOS 12', 'RAM: 4 GB', 'ROM: 64 GB', 'Chip xử lý: A12 Bionic 64-bit 7nm'],
    //     info: {
    //         screen: '6.5 inches',
    //         ram: '4 GB',
    //         rom: '64 GB',
    //         frontCamera: '7 MP, f / 2.2, 32mm',
    //         backCamera: '12 MP',
    //         os: 'iOS 12',
    //         sim: '1',
    //         pin: '3174 mAh'
    //     }
    // };
    const data = await product.detail('5ccaf18c677f2cc0f6a734ff');
    console.log(products);
    res.render('San_pham', {title: 'products.name', data})
};


