// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.26.0
// 	protoc        v3.14.0
// source: pkg/pb/summary.proto

package pb

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Entry struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Path    string `protobuf:"bytes,1,opt,name=path,proto3" json:"path,omitempty"`
	Mode    uint32 `protobuf:"varint,2,opt,name=mode,proto3" json:"mode,omitempty"`
	ModTime int64  `protobuf:"varint,3,opt,name=mod_time,json=modTime,proto3" json:"mod_time,omitempty"`
	Size    int64  `protobuf:"varint,4,opt,name=size,proto3" json:"size,omitempty"`
	Inode   uint64 `protobuf:"varint,5,opt,name=inode,proto3" json:"inode,omitempty"`
	Hash    []byte `protobuf:"bytes,6,opt,name=hash,proto3,oneof" json:"hash,omitempty"`
}

func (x *Entry) Reset() {
	*x = Entry{}
	if protoimpl.UnsafeEnabled {
		mi := &file_pkg_pb_summary_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Entry) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Entry) ProtoMessage() {}

func (x *Entry) ProtoReflect() protoreflect.Message {
	mi := &file_pkg_pb_summary_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Entry.ProtoReflect.Descriptor instead.
func (*Entry) Descriptor() ([]byte, []int) {
	return file_pkg_pb_summary_proto_rawDescGZIP(), []int{0}
}

func (x *Entry) GetPath() string {
	if x != nil {
		return x.Path
	}
	return ""
}

func (x *Entry) GetMode() uint32 {
	if x != nil {
		return x.Mode
	}
	return 0
}

func (x *Entry) GetModTime() int64 {
	if x != nil {
		return x.ModTime
	}
	return 0
}

func (x *Entry) GetSize() int64 {
	if x != nil {
		return x.Size
	}
	return 0
}

func (x *Entry) GetInode() uint64 {
	if x != nil {
		return x.Inode
	}
	return 0
}

func (x *Entry) GetHash() []byte {
	if x != nil {
		return x.Hash
	}
	return nil
}

type Summary struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	LatestModTime int64    `protobuf:"varint,1,opt,name=latest_mod_time,json=latestModTime,proto3" json:"latest_mod_time,omitempty"`
	Entries       []*Entry `protobuf:"bytes,2,rep,name=entries,proto3" json:"entries,omitempty"`
}

func (x *Summary) Reset() {
	*x = Summary{}
	if protoimpl.UnsafeEnabled {
		mi := &file_pkg_pb_summary_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Summary) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Summary) ProtoMessage() {}

func (x *Summary) ProtoReflect() protoreflect.Message {
	mi := &file_pkg_pb_summary_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Summary.ProtoReflect.Descriptor instead.
func (*Summary) Descriptor() ([]byte, []int) {
	return file_pkg_pb_summary_proto_rawDescGZIP(), []int{1}
}

func (x *Summary) GetLatestModTime() int64 {
	if x != nil {
		return x.LatestModTime
	}
	return 0
}

func (x *Summary) GetEntries() []*Entry {
	if x != nil {
		return x.Entries
	}
	return nil
}

var File_pkg_pb_summary_proto protoreflect.FileDescriptor

var file_pkg_pb_summary_proto_rawDesc = []byte{
	0x0a, 0x14, 0x70, 0x6b, 0x67, 0x2f, 0x70, 0x62, 0x2f, 0x73, 0x75, 0x6d, 0x6d, 0x61, 0x72, 0x79,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x02, 0x70, 0x62, 0x22, 0x96, 0x01, 0x0a, 0x05, 0x45,
	0x6e, 0x74, 0x72, 0x79, 0x12, 0x12, 0x0a, 0x04, 0x70, 0x61, 0x74, 0x68, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x04, 0x70, 0x61, 0x74, 0x68, 0x12, 0x12, 0x0a, 0x04, 0x6d, 0x6f, 0x64, 0x65,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x0d, 0x52, 0x04, 0x6d, 0x6f, 0x64, 0x65, 0x12, 0x19, 0x0a, 0x08,
	0x6d, 0x6f, 0x64, 0x5f, 0x74, 0x69, 0x6d, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x03, 0x52, 0x07,
	0x6d, 0x6f, 0x64, 0x54, 0x69, 0x6d, 0x65, 0x12, 0x12, 0x0a, 0x04, 0x73, 0x69, 0x7a, 0x65, 0x18,
	0x04, 0x20, 0x01, 0x28, 0x03, 0x52, 0x04, 0x73, 0x69, 0x7a, 0x65, 0x12, 0x14, 0x0a, 0x05, 0x69,
	0x6e, 0x6f, 0x64, 0x65, 0x18, 0x05, 0x20, 0x01, 0x28, 0x04, 0x52, 0x05, 0x69, 0x6e, 0x6f, 0x64,
	0x65, 0x12, 0x17, 0x0a, 0x04, 0x68, 0x61, 0x73, 0x68, 0x18, 0x06, 0x20, 0x01, 0x28, 0x0c, 0x48,
	0x00, 0x52, 0x04, 0x68, 0x61, 0x73, 0x68, 0x88, 0x01, 0x01, 0x42, 0x07, 0x0a, 0x05, 0x5f, 0x68,
	0x61, 0x73, 0x68, 0x22, 0x56, 0x0a, 0x07, 0x53, 0x75, 0x6d, 0x6d, 0x61, 0x72, 0x79, 0x12, 0x26,
	0x0a, 0x0f, 0x6c, 0x61, 0x74, 0x65, 0x73, 0x74, 0x5f, 0x6d, 0x6f, 0x64, 0x5f, 0x74, 0x69, 0x6d,
	0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x0d, 0x6c, 0x61, 0x74, 0x65, 0x73, 0x74, 0x4d,
	0x6f, 0x64, 0x54, 0x69, 0x6d, 0x65, 0x12, 0x23, 0x0a, 0x07, 0x65, 0x6e, 0x74, 0x72, 0x69, 0x65,
	0x73, 0x18, 0x02, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x09, 0x2e, 0x70, 0x62, 0x2e, 0x45, 0x6e, 0x74,
	0x72, 0x79, 0x52, 0x07, 0x65, 0x6e, 0x74, 0x72, 0x69, 0x65, 0x73, 0x42, 0x25, 0x5a, 0x23, 0x67,
	0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x67, 0x61, 0x64, 0x67, 0x65, 0x74,
	0x2d, 0x69, 0x6e, 0x63, 0x2f, 0x66, 0x73, 0x64, 0x69, 0x66, 0x66, 0x2f, 0x70, 0x6b, 0x67, 0x2f,
	0x70, 0x62, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_pkg_pb_summary_proto_rawDescOnce sync.Once
	file_pkg_pb_summary_proto_rawDescData = file_pkg_pb_summary_proto_rawDesc
)

func file_pkg_pb_summary_proto_rawDescGZIP() []byte {
	file_pkg_pb_summary_proto_rawDescOnce.Do(func() {
		file_pkg_pb_summary_proto_rawDescData = protoimpl.X.CompressGZIP(file_pkg_pb_summary_proto_rawDescData)
	})
	return file_pkg_pb_summary_proto_rawDescData
}

var file_pkg_pb_summary_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_pkg_pb_summary_proto_goTypes = []interface{}{
	(*Entry)(nil),   // 0: pb.Entry
	(*Summary)(nil), // 1: pb.Summary
}
var file_pkg_pb_summary_proto_depIdxs = []int32{
	0, // 0: pb.Summary.entries:type_name -> pb.Entry
	1, // [1:1] is the sub-list for method output_type
	1, // [1:1] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_pkg_pb_summary_proto_init() }
func file_pkg_pb_summary_proto_init() {
	if File_pkg_pb_summary_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_pkg_pb_summary_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Entry); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_pkg_pb_summary_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Summary); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	file_pkg_pb_summary_proto_msgTypes[0].OneofWrappers = []interface{}{}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_pkg_pb_summary_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_pkg_pb_summary_proto_goTypes,
		DependencyIndexes: file_pkg_pb_summary_proto_depIdxs,
		MessageInfos:      file_pkg_pb_summary_proto_msgTypes,
	}.Build()
	File_pkg_pb_summary_proto = out.File
	file_pkg_pb_summary_proto_rawDesc = nil
	file_pkg_pb_summary_proto_goTypes = nil
	file_pkg_pb_summary_proto_depIdxs = nil
}
