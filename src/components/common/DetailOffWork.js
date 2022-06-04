import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader, Row, Col, ModalFooter } from 'reactstrap';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Button from './Button';
import { formatDate } from '../../configs';
import NullPhoto from '../../assets/noimage.jpeg';

const DetailOffWork = React.forwardRef(({ row }, ref) => {
  const [toggle, setToggle] = useState(false);
  if (ref) ref.current = { setToggle };

  return (
    <Modal
      isOpen={toggle}
      modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }} size='lg'>
      <ModalHeader toggle={() => setToggle(v => !v)} style={{ alignItems: 'center' }} className='d-flex align-items-center'>
        <i className='fa fa-info-circle font-xl mr-2' style={{ marginBottom: 3 }} /> Detail Cuti/Izin
      </ModalHeader>
      <ModalBody className='mb-4'>
        <Row className='mb-3 mt-2'>
          <Col md='4'>
            <div className='w-100 d-flex flex-row align-items-center justify-content-between'>
              <h5 className='mb-0 font-weight-bold'>Employee</h5>
              <h5 className='mb-0 font-weight-bold'>:</h5>
            </div>
          </Col>
          <Col md='8' className='d-flex flex-row align-items-center'>
            <h5 className='mb-0'>{row.userId.username}</h5>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col md='4'>
            <div className='w-100 d-flex flex-row align-items-center justify-content-between'>
              <h5 className='mb-0 font-weight-bold'>Divisi</h5>
              <h5 className='mb-0 font-weight-bold'>:</h5>
            </div>
          </Col>
          <Col md='8' className='d-flex flex-row align-items-center'>
            <h5 className='mb-0'>{row.userId.divisi}</h5>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col md='4'>
            <div className='w-100 d-flex flex-row align-items-center justify-content-between'>
              <h5 className='mb-0 font-weight-bold'>Type Cuti/Izin</h5>
              <h5 className='mb-0 font-weight-bold'>:</h5>
            </div>
          </Col>
          <Col md='8' className='d-flex flex-row align-items-center'>
            <h5 className='mb-0'>{row.typeOffWork ? row.typeOffWork.name : <strong>-</strong>}</h5>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col md='4'>
            <div className='w-100 d-flex flex-row align-items-center justify-content-between'>
              <h5 className='mb-0 font-weight-bold'>Tanggal Mulai Cuti</h5>
              <h5 className='mb-0 font-weight-bold'>:</h5>
            </div>
          </Col>
          <Col md='8' className='d-flex flex-row align-items-center'>
            <h5 className='mb-0'>{formatDate(new Date(row.startOffWork))}</h5>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col md='4'>
            <div className='w-100 d-flex flex-row align-items-center justify-content-between'>
              <h5 className='mb-0 font-weight-bold'>Tanggal Selesai Cuti</h5>
              <h5 className='mb-0 font-weight-bold'>:</h5>
            </div>
          </Col>
          <Col md='8' className='d-flex flex-row align-items-center'>
            <h5 className='mb-0 text-capitalize'>{formatDate(new Date(row.endOffWork))}</h5>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col md='4'>
            <div className='w-100 d-flex flex-row align-items-center justify-content-between'>
              <h5 className='mb-0 font-weight-bold'>Deskripsi</h5>
              <h5 className='mb-0 font-weight-bold'>:</h5>
            </div>
          </Col>
          <Col md='8' className='d-flex flex-row align-items-center'>
            <h5 className='mb-0'>{row.desc}</h5>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col md='4'>
            <div className='w-100 d-flex flex-row align-items-center justify-content-between'>
              <h5 className='mb-0 font-weight-bold'>Lampiran</h5>
              <h5 className='mb-0 font-weight-bold'>:</h5>
            </div>
          </Col>
          <Col md='8' className='d-flex flex-row align-items-center'>
            <Zoom zoomMargin={40}>
              <img
                src={row.imageOffWork ? row.imageOffWork : NullPhoto}
                alt='img-off-work'
                className='img-fluid'
                style={{ width: 210, height: 150 }}
                onError={(e) => { e.target.onerror = null; e.target.src = NullPhoto }}
              />
            </Zoom>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Row>
          <Col className='d-flex flex-row align-items-center justify-content-end'>
            <Button
              isSuccess
              hasShadow
              icon='fa fa-check-circle mr-2'
              onClick={() => setToggle(false)}
              style={{ paddingRight: '20px', paddingLeft: '20px' }}>
              Done
            </Button>
          </Col>
        </Row>
      </ModalFooter>
    </Modal>
  )
})

export default DetailOffWork;
